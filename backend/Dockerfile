# Use the official Python image.
FROM python:3.11-slim

# Set the working directory in the container.
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app.
COPY . .

# Install any needed packages specified in requirements.txt.
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get install -y postgresql-client tesseract-ocr libtesseract-dev

# Make port 8000 available to the world outside this container.
EXPOSE 8000

# Run the application.
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]