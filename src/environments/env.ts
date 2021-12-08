import { ProductionEnvironment } from './prod.env';
import { DevEnvironment } from './dev.env';
export interface Environment {
    db_url: string;
}
export function getEnvironmentVariable() {
    if (process.env.NODE_ENV === 'prod') {
        return ProductionEnvironment;
    }
    return DevEnvironment;

}