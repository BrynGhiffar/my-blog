# NeueSide Frontend

## Update Logs

**12 Mar 2023**
Created the login and register page. I decided to make a blog. Visitors of the site can register, login and make blogs. In the future, I want the users to do more than just create and view blogs. Maybe, like a kind of cloud storage.

**24 Feb 2023**
Added an image captioner page, this page allows users to upload images. Which will then be sent to an AI, to caption the image. This still doesn't seem to fit into the website.

**22 Jan 2023**
Added basic pages. They kinda don't make sense together, but I added them anyway.

## Development
1. Clone Repository then cd into it.
2. do `npm install`
3. do `npm run dev` to create a hot reload server

## Production
### Deploy using docker containers
Dependencies:
* Docker
```
> docker image build -t my-blog-image .
> docker container run -p 8000:8000 -it --name my-blog-container my-blog
```
You can also pull the docker image by doing:
```
> docker pull brynghiffar/my-blog:<version to pull>
```