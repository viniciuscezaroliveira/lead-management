FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY ["Backend.API/Backend.API.csproj", "Backend.API/"]
COPY ["Backend.Domain/Backend.Domain.csproj", "Backend.Domain/"]
COPY ["Backend.Infrastructure/Backend.Infrastructure.csproj", "Backend.Infrastructure/"]
RUN dotnet restore "Backend.API/Backend.API.csproj"

COPY . .
RUN dotnet publish "Backend.API/Backend.API.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/sdk:6.0
WORKDIR /app

COPY --from=build /src .
COPY --from=build /app/publish ./publish

RUN dotnet tool install --global dotnet-ef --version 6.0.26
ENV PATH="$PATH:/root/.dotnet/tools"

ENV ASPNETCORE_URLS=http://+:80
ENV DOTNET_RUNNING_IN_CONTAINER=true
EXPOSE 80

ENTRYPOINT ["sh", "-c", "cd publish && dotnet Backend.API.dll"]