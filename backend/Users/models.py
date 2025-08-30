from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.core.validators import RegexValidator
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, phone_number=None, email=None, admission_number=None, password=None, **extra_fields):
        if not phone_number and not email and not admission_number:
            raise ValueError(_('You must provide either a phone number, email, or admission number'))
        user = self.model(phone_number=phone_number, email=email, admission_number=admission_number, **extra_fields)
        user.set_password(password)
        user.set_username()
        user.save(using=self._db)
        return user

    def create_superuser(self, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        choice = input("Do you want to register with (1) Email, (2) Phone Number, or (3) Admission Number? ")
        if choice == "1":
            email = input("Enter Email: ")
            phone_number = None
            admission_number = None
        elif choice == "2":
            phone_number = input("Enter Phone Number: ")
            email = None
            admission_number = None
        elif choice == "3":
            admission_number = input("Enter Admission Number: ")
            email = None
            phone_number = None
        else:
            raise ValueError(_('Invalid choice! Please choose 1 for Email, 2 for Phone Number, or 3 for Admission Number'))

        if not email and not phone_number and not admission_number:
            raise ValueError(_('Superuser must have either phone number, email, or admission number'))

        return self.create_user(phone_number=phone_number, email=email, admission_number=admission_number, password=password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        max_length=15, unique=True, blank=True, null=True,
        validators=[RegexValidator(
                                    r"^(?:254|\+254|0)?((?:[0-9])(?:(?:[123][0-9])|(?:0[0-8])|(9[0-2]))[0-9]{6})$",
                                    "The phone number provided is invalid"
                                        )   ]
    )
    email = models.EmailField(unique=True, blank=True, null=True)
    admission_number = models.CharField(max_length=20, unique=True, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=255, unique=True, blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def set_username(self):
        if self.email:
            self.username = self.email
        elif self.phone_number:
            self.username = self.phone_number
        elif self.admission_number:
            self.username = self.admission_number

    def save(self, *args, **kwargs):
        self.set_username()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username if self.username else "User"
