using Backend.Application.Interfaces;
using Backend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Infrastructure.Repositories
{
    public class LeadRepository : ILeadRepository
    {
        private readonly AppDbContext _context;

        public LeadRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<LeadEntity> AddLeadAsync(LeadEntity lead)
        {
            var response = await _context.Leads.AddAsync(lead);
            await _context.SaveChangesAsync();
            return response.Entity;
        }

        public async Task<LeadEntity> GetLeadByIdAsync(int id)
        {
            return await _context.Leads.FindAsync(id);
        }

        public async Task<IEnumerable<LeadEntity>> GetLeadsByStatusAsync(LeadStatus status)
        {
            return await _context.Leads.Where(l => l.Status == status).ToListAsync();
        }

        public async Task UpdateLeadAsync(LeadEntity lead)
        {
            _context.Leads.Update(lead);
            await _context.SaveChangesAsync();
        }
    }
}