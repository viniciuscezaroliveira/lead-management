
# Criar migration
  dotnet ef migrations add UpdateLeadEntity --project Backend.Infrastructure --startup-project Backend.API
# Rodar migrations
 dotnet ef database update --project Backend.Infrastructure --startup-project Backend.API