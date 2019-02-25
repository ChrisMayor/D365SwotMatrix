
import { swotItemCollection } from '../model/swotItemCollection';
import { Observable } from 'rxjs';

export interface DynamicsService {

   writeSwotToDynamics(sowtItems: swotItemCollection[]): void;

   readSwotFromDynamics():  Observable<swotItemCollection[]> ;

   isFormInCreate():  Observable<boolean> ;
  }
