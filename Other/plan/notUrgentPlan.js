/*

NOTE: Some of the REST convention aren't followed in our code. There is a scope to implement pagination, offset and all those things described in this video (https://www.youtube.com/watch?v=-mN3VyJuCjM&ab_channel=ByteByteGo), once you are done with an initial prototype, make your code follow the REST norms.


To do in the frontend:

-> https://www.wix.com/website-template/view/html/1908 --> This design for the pricing card.
-> Remove coworking subscription.
-> Slider functionality setup 
-> Get in touch section--> icons setup and design tweaks.
-> FAQ tweaks for smooth drop down.
-> Navbar setup (connection of different pages or scroll down effect to different sections.)
-> Hero section slider effect.



Backend:

-> Sign up. -> Email authentication.
-> JWT for login. --> Frontend for the user. --> Regular expression is one of the option for doing authentication.
-> Admin panel. --> Showing up the database. --> Authentication of admin and giving him the database to show everything. --> Admin should have a control on the database.


springboard indicube, clayworks

-> Record of the previous customer.
-> Amenities  -> Create a frontend for amenities. (Which will be one of the frontend for user)

-> Reservation and Pricing -> Cart and all those components as the frontend.



-> Reset password
-> JWT for user authentication
-> User frontend setup
-> Sign up page: error handling proper for different things --> email format check, mobile number check etc.
-> Sign up page backend setup like different error fixing --> letting user know that his email and password is already in use so he should sign-in.
-> Email verification.
-> Admin page setup for different CRUD operations.
-> JWT has some session timing thing. You should set it up to make the token invalid after a certain specified time for security purpose.
-> For my admin data, I am making database request in a different file than my main server file. I am not following the dry principle, this can cause problem. I have to follow the philosophy of one way in and guarding that way, the more the number of ways to the database, the more issues might arise so I have to transfer 


Modularizing backend todo:
-> Modify frontend form requests to bind them with crud controllers and routes.

The problem I am facing is that I don't know the use of router, so I am getting confused regarding why I am using it in the first place.
-> So the thing is, routes need to be uniform and they are appended to create other sub-routes based on requirements.

-> Okay, so I will create an entirely different route system and test those API without caring about the frontend for the time being.

-> Based on my analysis of John Smilga's code he is doing mostly client side rendering based on his requirements.



Here is how I am going to refactor my codebase:
-> There should be just res.send controllers in the main file. Rest everything will handled from the router file.

-> I don't need to create route for everything, once I declare a file as static and with the name index.html, it will automatically link my other files.



PLAN -- 22/10/2022

What are the remaining things?
-> Setup a user page with all of their information. 
    - The design will be given by Anushree.
    - It should contain a catalogue showing all the possible reservation options.
    - The it should have an option to make those reservation using payment gateway.
    - I will first make a system to make reservation then later on I will setup the payment part.
    - Then there should be an option to cancel the reservation made.
    - Other then that it should show the history of the user's reservations. We can run some sql algebra to figure out this thing. But this will come after we setup the earlier part.
    - These are some of the necessary requirements, they are not some add-on features and the focus should be to first create this requirements.

    TODO:
    -> Planning weekwise 
    -> Documentation 80 - 100
    -> Testing
    ->  

    -> A table with history of all the users who have ever reserved.
*/