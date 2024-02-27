import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import { NotificationManager } from 'react-notifications';


import { IUser } from '../interfaces/IUser';
const url = process.env.REACT_APP_VariableName
export class AuthStore {
    public user: IUser[] | null;
    public isLoggedIn: boolean;
    public loading: boolean;
    public addCount : number
    public updateCount: number
public getByidUser :  IUser | null;
    public constructor() {
        this.user = null;
        this.isLoggedIn = false;
        this.loading = false;
        this.getByidUser=null;
        this.addCount=0;
        this.updateCount=0;

        makeAutoObservable(this);
    }


    public setAddCount(value:number ):void{
        this.addCount=value;
    }

    public setUpdateCount(value:number ):void{
        this.updateCount=value;
    }
    private setUserById (value:IUser | null):void{
        this.getByidUser=value
    }
    private setUser(value: IUser[] | null): void {
        this.user = value;
    }
    public setIsLoggedIn(status: boolean) {
        this.isLoggedIn = status;
    }

    private setLoading(value: boolean): void {
        this.loading = value;
    }

    public async displayUser(): Promise<boolean> {
        this.setLoading(true);
        this.setUser(null);

        try {
            const response = await axios.get(`${url}users/`);
            console.log(response.data ,'cccccccccccccccccccccccccccccccccccc')
            this.setUser(response.data);
            this.setIsLoggedIn(true);
            // NotificationManager.success('Successfully Logged In....', '', 3000);
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }

        return false;
    }


    public async addUser(data :IUser): Promise<boolean> {
        this.setLoading(true);
        this.setUser(null);

        try {
            const response = await axios.post(`${url}users/add`,data);
            console.log(response.data ,'cccccccccccccccccccccccccccccccccccc')
            this.setUser(response.data);
            this.setIsLoggedIn(true);
            // NotificationManager.success('Successfully Logged In....', '', 3000);
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
        } finally {
            this.setLoading(false);
        }

        return false;
    }
    // logut

    public async updateUser(userId: string, updatedData: Partial<IUser>): Promise<boolean> {
        this.setLoading(true);

        try {
            const response = await axios.get(`${url}users/update/${userId}`);
            console.log(response.data, 'User updated successfully');
            this.setUserById(response.data)
            // Optionally update local state or perform any necessary actions after successful update
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    }


    public async getuserid(userId: string): Promise<boolean> {
        this.setLoading(true);

        try {
            const response =await axios.get(`${url}users/getuserid/${userId}`);
            this.setUserById(response.data)
            console.log(response.data, 'User updated successfully');
            // Optionally update local state or perform any necessary actions after successful update
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    }


    public async update(userId: string , data :IUser): Promise<boolean> {
        this.setLoading(true);

        try {
            const response =await axios.post(`${url}users/update/${userId}` ,data);
            this.setUserById(response.data)
            console.log(response.data, 'User updated successfully');
            // Optionally update local state or perform any necessary actions after successful update
            return true;
        } catch (error) {
            NotificationManager.error(
                (axios.isAxiosError(error) && error.message) || (error instanceof Error && error.message) || (error as string),
                '',
                3000
            );
            return false;
        } finally {
            this.setLoading(false);
        }
    }

    // In your AuthStore

  
  public async getUpdateCount(): Promise<number> {
    try {
      const response = await axios.get(`${url}users/counts`);
      this.setUpdateCount(response?.data?.updateCount)

    } catch (error) {
      console.error('Error fetching update count:', error);
      return 0; // Default to 0 in case of error
    }
  }
  


    
  
    
}
