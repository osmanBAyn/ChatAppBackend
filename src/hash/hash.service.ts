import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class HashService {
    hash(password: string): Promise<string> {
        return bcrypt.hash(password, 12);
    }
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password,hash);
    }
}
