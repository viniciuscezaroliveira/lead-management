using Backend.Application.DTOs.Lead;
using static Backend.Application.DTOs.Lead.StatusLeadRequestDTO;

namespace Backend.Application.Interfaces.Service
{
    public interface IGetLeadService
    {
        Task<List<LeadResponseDto>> ExecuteAsync(LeadStatusDTO dto);
    }
}