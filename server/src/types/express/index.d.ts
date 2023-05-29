// declare global {
//   namespace Express {
//     export interface Request {
//       userInfo?: {
//         roles: string[];
//         userId: number;
//       };
//     }
//   }
// }
declare global {
  namespace Express {
    interface Request {
      roles?: string[];
      userId?: number;
    }
  }
}

export default Request;
