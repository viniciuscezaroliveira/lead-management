using Backend.Application.DTOs.Lead;

namespace Backend.Application.Interfaces.Service
{
    public interface ICreateLeadService
    {
        Task<string> ExecuteAsync(CreateLeadRequestDTO dto);
    }
}