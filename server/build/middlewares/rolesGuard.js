export function rolesGuard(...allowedRoles) {
    return (req, res, next) => {
        if (!(req === null || req === void 0 ? void 0 : req.roles))
            return res.sendStatus(401);
        const isRouteAllowed = req.roles.some((role) => allowedRoles.includes(role));
        if (!isRouteAllowed)
            return res.sendStatus(401);
        next();
    };
}
//# sourceMappingURL=rolesGuard.js.map