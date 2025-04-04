FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY ["Backend.API/Backend.API.csproj", "Backend.API/"]
COPY ["Backend.Domain/Backend.Domain.csproj", "Backend.Domain/"]
COPY ["Backend.Infrastructure/Backend.Infrastructure.csproj", "Backend.Infrastructure/"]
RUN dotnet restore "Backend.API/Backend.API.csproj"

# Copy everything else and build
COPY . .
RUN dotnet publish "Backend.API/Backend.API.csproj" -c Release -o /app/publish

# Runtime stage
FROM mcr.microsoft.com/dotnet/sdk:6.0
WORKDIR /app

# Copiar a solução completa para ter acesso aos projetos para o EF
COPY --from=build /src .
COPY --from=build /app/publish ./publish

# Install EF Core tools
RUN dotnet tool install --global dotnet-ef --version 6.0.26
ENV PATH="$PATH:/root/.dotnet/tools"

# Set environment variables
ENV ASPNETCORE_URLS=http://+:80
ENV DOTNET_RUNNING_IN_CONTAINER=true
EXPOSE 80

# Usar o comando correto para as migrations
ENTRYPOINT ["sh", "-c", "cd publish && dotnet Backend.API.dll"]