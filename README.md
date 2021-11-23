# Raffles Ticketing

This repository comprehensively comprises of the required API with some front-end Integration.

## The API

API has been constructed in **Express.js** framework for **Node.js** integrated with **MongoDB** database
through mLab. (Server URL for the Database provided in `.env`)

Two schemas have been used i.e. `User` and `Rticket` 

##### User Schema
For storing app users. This carries the following properties whose names are self-explanatory :
- `name` : User's name                           (String, Mandatory field)
- `email`: User's email id                       (String, Mandatory field)
- `contact` : User's contact                     (`Number`, Mandatory field)
- `applications` : List of all tickets Purchased (Array, Initialized as an Empty array by default)
- `created` : Date of creation                   (Input as "yyyy-mm-dd". Defaults to the current date)

**Methods** 

- `GET` :
    - For getting all users                                               {Endpoint : `/users/all`}    
- `POST` :
    - For creating a new user                                             {Endpoint : `/users/create`}
- `PUT` :
    - For purchasing a new lottery named 'lottery' by a user named 'name' {Endpoint : `/users/purchase/:name/:lottery`}

##### Rticket Schema
For storing info about various raffle tickets. This carries the following properties whose names are self-explanatory :
- `lottery` : Raffle Lottery's name                    (String, Mandatory field) 
- `prize` : Prize to be won                            (String, Madatory field)
- `price` : Price of purchasing this ticket            (String, Mandatory field)
- `applicants`: List of names of all applicants        (Array, Initialized as an Empty array by default)
- `winner` : Person's name who won this raffle lottery (String, Defaults to 'Not Declared')
- `date` : Date of opening for this raffle             (Input as "yyyy-mm-dd". Defaults to the current date)
- `time` : Time of opening of this raffle              (String, Mandatory field)

**Methods** 

- `GET` :
    - For getting all tickets                                            {Endpoint : `/rtickets/all`} 
    - For getting winners from last week                                 {Endpoint : `/rtickets/winners`}
    - For getting the upcoming raffle lottery info                       {Endpoint : `/rtickets/next`}
- `POST` :
    - For creating a new ticket                                          {Endpoint : `/rtickets/create`}
- `PUT` :
    - For randomly generating a winner for given lottery named 'lottery' {Endpoint : `/rtickets/winner/:lottery`}

## User-Interface

Created in **React** using **Chakra-UI**. This is a lightweight front-end capable of making
preliminary calls using the provided buttons.

**Buttons**

- `Last week's winners` : Get names of last week's lottery winners and the prizes they won {Endpoint : `/rtickets/winners`}
- `Coming up next!` : Get the latest upcoming raffle ticket's info                         {Endpoint : `/rtickets/next`}
- `Statistics` : Get info about total participants per lottery and the winner if declared  {Endpoint : `/rtickets/all`}

## Starting up

Just execute `npm start` in the terminal inside the `API` directory to run the backend. After that, kick start the UI using `npm start` in a different terminal from the `api-live` directory.

**P.S.** : Some calls are yet to be integrated with front-end. Apologies for skipping due to time constraints.