# Generated by Django 4.2.6 on 2024-01-09 09:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('JOBS', '0004_alter_job_education'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='jobType',
            field=models.CharField(choices=[('Permanent', 'Permanent'), ('Temporary', 'Temporary'), ('Intership', 'Intership')], default='Permanent', max_length=20),
        ),
    ]
