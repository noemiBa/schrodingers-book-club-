# Schrodingers Book Club: Book Recommendation System

This README provides information about Schrodingers Book Club, a scalable and fault-tolerant RESTful book recommendation system. The following sections will provide details about the system's functionality, instructions on how to compile and run the code, as well as links to the report and video showcasing the project.

### Team Name: Schrodingers Book Club

## Requirements
- Docker

### System Summary:
Schrodingers Book Club is a distributed application that helps users discover new books based on their preferences. The system uses a micro-services architecture, with the following components:

- **QuizService**: An interactive quiz service that asks users a series of multiple-choice questions to determine their reading preferences. Based on their responses, the service generates book recommendations tailored to their tastes. This is done by mapping book tags to the user responses.

- **QuotesService**: An alternative method of recommending books, where users can read short quote excerpts from books without knowing their titles. The service provides book recommendations whenever the users press an 'unveil the mystery' button to find out where the quote is from.

- **DatabaseServer**: A server that connects to a separate database and retrieves the necessary data - information about books, users, and their recommendations - for the other services.

- **FrontEnd**: The front-end service responsible for handling user requests and displaying the recommendations. It integrates data from the QuizService and QuotesService and presents it in a user-friendly format.

The system supports user account creation and storage of past recommendations. When users are logged in, their recommendations are stored in the DatabaseServer and can be retrieved for display.

### Compilation and Execution Instructions:
[Add instructions on how to compile and run your code here.]

### Report:
For a detailed description of the project, please refer to the [Report](SchrodingersBookClub_report.pdf) uploaded in the root folder of the project.

### Video Showcase:
To see a video showcasing the Book Recommendation System, please follow this [link](video_link).

### Pre-Registered Users:
For testing purposes, a number of users have already been added to the database. You can sign in as one of the following users without having to create a new account:
- Username: FrodoBaggins, Password: OneRingToRuleThemAll
- Username: HermioneGranger, Password: WingardiumLeviosa
- Username: SherlockHolmes, Password: ElementaryMyDearWatson
- Username: KatnissEverdeen, Password: Mockingjay
- Username: test, Password: test

### Kubernetes and Eureka Configuration
Do to CORS errors, we were unable to connect pods. Please follow the instructions to startup the Kubernetes and Eureka Configuration.

Recreate the environment for testing:
- Prerequisites:
- Docker
- Kubernetes
- Kubectl
- Minikube

Once all the prerequisites have been installed start up minikube with: 

    minikube start

In the root folder of the project is an executable file which will launch the necessary pods.
For windows you can double click the startpods.bat
For Linux or Mac from the terminal:

    chmod +x startpods.sh
    ./startpods.sh

Open a dashboard from a terminal with: minikube dashboard
Wait until all the pods have gone from yellow to green. This will take several minutes to startup.	

In a terminal: 

    minikube kubectl -- port-forward service/frontend-service 8080:8080
Open a web browser: 

    localhost:8080

To view the Eureka registration, in a new terminal:

    minikube kubectl -- port-forward service/eureka-server-service 8761:8761

Open a web browser:

    localhost:8761

A screenshot of this in action can be found [here](eureka_snapshot.png)
