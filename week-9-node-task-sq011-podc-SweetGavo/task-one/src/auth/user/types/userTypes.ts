interface UserRegistration {
    firstName: string;
    lastName: string;
    dob: Date;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

interface UserLogin {
    email: string;
    password: string
}

interface Transaction {
    senderAccount: string;
    receiverAccount: string;
    amount: number;
    description: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    firstname?: string | undefined;
    lastname?: string | undefined;
    dob?: Date | undefined;
    email?: string | undefined;
    phoneNumber?: string | undefined;
    password?: string | undefined;
}