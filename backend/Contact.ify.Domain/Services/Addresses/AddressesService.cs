using AutoMapper;
using Contact.ify.DataAccess.Entities;
using Contact.ify.DataAccess.UnitOfWork;
using Microsoft.Extensions.Configuration;

namespace Contact.ify.Domain.Services.Addresses;

public class AddressesService : IAddressesService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IConfiguration _configuration;

    public AddressesService(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration configuration)
    {
        _unitOfWork= unitOfWork ?? throw new ArgumentNullException(nameof(unitOfWork));
        _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
    }


    public Task<bool> AddAddress()
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateAddress()
    {
        throw new NotImplementedException();
    }

    public Task<bool> RemoveAddress()
    {
        throw new NotImplementedException();
    }

    public async Task<ICollection<ContactAddress>?> GetAllAddressesForUserAsync(string userId)
    {
        return await _unitOfWork.Addresses.GetAllAddressesForUserAsync(userId);
    }

    public async Task<ContactAddress?> GetAddressByIdForUserAsync(string userId, int id)
    {
        return await _unitOfWork.Addresses.GetAddressByIdForUserAsync(userId, id);
    }
}