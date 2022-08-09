import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../developer/components/Button";
import InputField from "../../developer/components/Fields/InputField";
import { setUser } from "../store/userSlice";
import { getBaseURL } from "../utils/api";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { control, handleSubmit } = useForm();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(true);

    const login = (data: any) => {
        fetch('http://localhost:8001/internal-api/auth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            // mode: 'no-cors',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    dispatch(setUser(result));
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    return (
        <div className="w-full max-w-lg h-screen">
            <form onSubmit={handleSubmit(login)} className='space-y-4 m-auto'>
                <Controller
                    name='email'
                    control={control}
                    render={({ field }) => <InputField
                        {...field}
                        name='email'
                        label='Email'
                        type='text'
                        fieldType={''}
                    />}
                />
                <Controller
                    name='password'
                    control={control}
                    render={({ field }) => <InputField
                        {...field}
                        name='password'
                        label='Password'
                        type='password'
                        fieldType={''}
                    />}
                />
                <Button type='submit'>Sign In</Button>
            </form>
        </div>
    )
}