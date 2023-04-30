import { tokenService } from '../services/tokenService.js';

class TokenController {
  create() {
    return tokenService.create();
  }
  refresh() {
    return tokenService.refresh();
  }
  delete() {
    return tokenService.delete();
  }
}

export const tokenController = new TokenController();
