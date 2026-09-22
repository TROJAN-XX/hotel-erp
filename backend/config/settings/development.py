from .base import *

DEBUG = True

INSTALLED_APPS += [
    "django_extensions",
]

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"
