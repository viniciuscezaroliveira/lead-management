using Backend.Application.DTOs.Lead;

namespace Backend.Application.Interfaces.Service
{
    public interface IUpdateStatusLeadService
    {
        Task ExecuteAsync(int id, StatusLeadRequestDTO dto);
    }
}