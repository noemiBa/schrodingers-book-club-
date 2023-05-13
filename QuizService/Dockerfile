# Use an official OpenJDK runtime as a parent image
FROM openjdk:11-jdk-slim AS build

# Install JDK and Maven
RUN apt-get update && \
    apt-get install -y default-jdk maven

# Set the working directory to /app
WORKDIR /app

# Copy the pom.xml file and download the dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Copy the rest of the application code
COPY src/ ./src/

# Build the application
RUN mvn package

# Use a smaller base image for the final image
FROM openjdk:11-jre-slim

# Set the working directory to /app
WORKDIR /app

# Copy the executable jar file from the build stage
COPY --from=build /app/target/*.jar ./app.jar

# Set the command to run the application
CMD ["java", "-jar", "app.jar"]
