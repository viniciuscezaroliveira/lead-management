namespace Backend.Application.Interfaces.Gateways
{
    public interface IEmailGateway
    {
        Task ExecuteAsync(string to, string subject, string body);
    }
}