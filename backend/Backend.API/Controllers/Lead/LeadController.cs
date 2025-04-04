using Backend.Application.Interfaces.Service;
using Microsoft.AspNetCore.Mvc;

namespace Backend.API.Controllers.Lead
{
    [ApiController]
    [Produces("application/json")]
    [Consumes("application/json")]
    [Route("lead")]
    public partial class LeadController : ControllerBase
    {
        private readonly ICreateLeadService _createLeadService;
        private readonly IUpdateLeadService _updateLeadService;
        private readonly IUpdateStatusLeadService _updateStatusLeadService;
        private readonly IGetLeadService _getLeadService;

        public LeadController(ICreateLeadService createLeadService, IUpdateLeadService updateLeadService, IUpdateStatusLeadService updateStatusLeadService, IGetLeadService getLeadService)
        {
            _createLeadService = createLeadService;
            _updateLeadService = updateLeadService;
            _updateStatusLeadService = updateStatusLeadService;
            _getLeadService = getLeadService;
        }

    }
}