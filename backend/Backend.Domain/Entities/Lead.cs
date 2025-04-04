namespace Backend.Domain.Entities
{
    public class LeadEntity
    {
        public int Id { get; set; }
        public string ContactFirstName { get; set; }
        public string ContactLastName { get; set; }
        public string ContactPhoneNumber { get; set; }
        public string ContactEmail { get; set; }
        public string Suburb { get; set; }
        public string Category { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public LeadStatus Status { get; set; }

        public void HandleApplyDiscount()
        {
            if (Price > 500 && Status == LeadStatus.Accepted)
            {
                decimal discount = Price * 0.10m;
                Price = Price - discount;
            }
        }
    }

    public enum LeadStatus
    {
        Invited = 0,
        Accepted = 1,
        Declined = 2
    }
}