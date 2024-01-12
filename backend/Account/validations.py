import os

def validate_resume(name):
    valid = True
    ext = os.path.splitext(name)[1]
    available_extensions = ['.pdf']

    if not ext.lower() in available_extensions:
        valid = False
    return valid