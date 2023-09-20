#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["Contact.ify/Contact.ify.csproj", "Contact.ify/"]
COPY ["Contact.ify.DataAccess/Contact.ify.DataAccess.csproj", "Contact.ify.DataAccess/"]
COPY ["Contact.ify.Domain/Contact.ify.Domain.csproj", "Contact.ify.Domain/"]
RUN dotnet restore "Contact.ify/Contact.ify.csproj"
COPY . .
WORKDIR "/src/Contact.ify"
RUN dotnet build "Contact.ify.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Contact.ify.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Contact.ify.dll"]