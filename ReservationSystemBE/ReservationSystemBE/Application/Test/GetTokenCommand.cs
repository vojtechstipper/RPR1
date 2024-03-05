using MediatR;
using ReservationSystem.Domain.Users;
using ReservationSystemBE.Application.Services;

namespace ReservationSystemBE.Application.Test;

public record GetTokenCommand : IRequest<string>;

public class GetTokenCommandHandler : IRequestHandler<GetTokenCommand, string>
{
    private readonly IAuthService _authService;

    public GetTokenCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public Task<string> Handle(GetTokenCommand request, CancellationToken cancellationToken)
    {
        var user = new User();
        return _authService.GenerateToken(user);
    }
}
