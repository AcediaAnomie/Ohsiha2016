# Ohsiha2016
### Requirements ###
* Python 3.5
* Pip 8.1.1

### How to install ###
Go to project root directory and create virtual env:
```sh
$ virtual venv
```
After that you need to activate it:
**Linux:**
```sh
$ source venv/bin/activate
```
**Windows**
```sh
$ venv/Scripts/activate
```
Finally install all the dependencies:
```sh
$ pip install -r requirements.txt
```
### How to run ###
You can use either heroku cli or Django's own development server

**Heroku CLI:**
```sh
$ heroku local web
```
**Django built-in server:**
```sh
$ python manage.py runserver
```
**Note:**
In order to run the app successfully, there needs to be the following environmental variables defined:
* DOMAIN
* DEVELOPMENT
* DATABASE_URL

You can set the enlisted vars by creating local .env file in project root directory or set them system-wide

**Example of .env file used in development:**
```sh
DEVELOPMENT=true
DATABASE_URL=postgres://postgres:postgres@localhost:5432/movieapp_db
DOMAIN=localhost
```

### Dependencies ###
Found in requirements.txt

