using Backend.Application.Interfaces.Gateways;

namespace Backend.Infrastructure.Gateways
{
    public class FakeEmailGateway : IEmailGateway
    {
        public Task ExecuteAsync(string to, string subject, string body)
        {
            return Task.CompletedTask;
        }
    }
}