# Information from Contributor

## Summary
This project is to fulfill the last phase of the Flatiron School bootcamp. The inspiration for this project came from working in a tax firm where tasks could be divided up. I designed this app to mimic a small piece of what that could look like.

Overall, this project has been a learning opportunity to learn more on redux and other tools available to add to react and rails. I also used it as an opportunity to learn css through The Odin Project and try scss with it. I also implemented uploading photos, sending them to cloudinary to crop,focus on the face and serve as a content delivery network for those photos. I also added automatic emailing for when a user is assigned a task. 

For the next project, I plan to dig deeper into scss to expand my usage of organization, variables and functions in order to make it more consistent and be able to make global changes if need be. I also want to start separating more functions out of my components to be reused, add custom hooks, and create more helpers to separate and dry up the code more and make it more consistent.

## Directions for App
1. Signup or login. I have a username setup of test and password of test.
2. The sidebar shows contacts to see tasks by firm or user.
3. If you are in projects, then the sidebar shows the list of projects.
4. Test out uploading a photo, it will automatically crop it around your face.
5. Create, edit, delete any task, project or your own user. 
6. You can assign a task to any user, it will email the email on file.

## Setup

Use `sudo service postgresql start` to start postgresql
Use `rails s` to start server on `http://localhost:3000`
Use `npm start --prefix client` to run the front end on `http://localhost:4000`

## Link to deployed site

Link to deployment `https://firm-management.onrender.com/`

Please note that this is on the free version of render and can take a minute for the server to spin up.

## Demo Link
`https://youtu.be/JMhC195O1dA`