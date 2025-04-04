using Backend.Application.DTOs.Lead;

namespace Backend.Application.Interfaces.Service
{
    public interface IUpdateLeadService
    {
        Task ExecuteAsync(int id, UpdateLeadRequestDTO dto);
    }
}