using Backend.Domain.Entities;

namespace Backend.Application.Interfaces
{
    public interface ILeadRepository
    {
        Task<IEnumerable<LeadEntity>> GetLeadsByStatusAsync(LeadStatus status);
        Task<LeadEntity> GetLeadByIdAsync(int id);
        Task<LeadEntity> AddLeadAsync(LeadEntity lead);
        Task UpdateLeadAsync(LeadEntity lead);

    }
}