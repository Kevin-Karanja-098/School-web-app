from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'phone_number', 'admission_number', 'is_active', 'is_staff', 'date_joined']
        read_only_fields = ['id', 'is_active', 'is_staff', 'date_joined']

    def create(self, validated_data):
        phone_number = validated_data.get('phone_number', None)
        admission_number = validated_data.get('admission_number', None)
        email = validated_data.get('email', None)
        password = validated_data.get('password')

        if not phone_number and not admission_number and not email:
            raise serializers.ValidationError("User must have either a phone number, admission number, or email")
        
        user = CustomUser.objects.create_user(
            phone_number=phone_number,
            admission_number=admission_number,
            email=email,
            password=password
        )
        return user

    def validate(self, data):
        phone_number = data.get('phone_number', None)
        admission_number = data.get('admission_number', None)

        if admission_number and not admission_number.startswith('1112'):
            raise serializers.ValidationError({'admission_number': 'Admission number must start with 1112'})

        if phone_number:
            phone_validator = serializers.RegexField(
                regex=r'^\+?1?\d{9,15}$',
                error_messages={
                    'invalid': "Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed."
                }
            )
            phone_validator(phone_number)

        return data
