import { useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ApplicationLogo,
    TextInput,
    PrimaryButton,
    InputLabel,
    Checkbox, InputError
} from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";


export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        login: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    // console.log(errors);

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <div className="flex items-center justify-start gap-2">
                <a href="/">
                    <ApplicationLogo className="w-8 h-8 mx-auto text-gray-500 fill-current aspect-square " />
                </a>

                <strong className="text-sm italic font-bold text-slate-600">
                    BPS Provinsi Jambi
                </strong>
            </div>

            <div className="flex-col justify-center w-full mt-5">
                <strong className="flex justify-center mb-1 text-2xl tracking-wider uppercase text-slate-500 text-gradient bg-gradient-to-br from-primary/80 via-slate-500 to-secondary/70">
                    SIPACAK
                </strong>

                <strong className="block -mt-1 text-lg font-semibold text-center text-slate-600">
                    Sistem Pencetakan Angka Kredit
                </strong>
            </div>

            <p className="mt-5 text-sm font-semibold text-center text-slate-600/90">
                Selamat Datang, silahkan masuk menggunakan akun anda
            </p>

            <section className="mx-2 mt-6 ">
                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="login/nip" value="Email/NIP" />

                        <TextInput
                            id="login"
                            type="text"
                            name="login"
                            value={data.login}
                            className="block w-full mt-1 h-11"
                            autoComplete={data.login}
                            placeholder="Masukkan Email/NIP"
                            isFocused={true}
                            onChange={(e) => setData("login", e.target.value)}
                        />

                        <InputError message={errors.login} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full mt-1 h-11"
                            placeholder="Masukkan password"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="block mt-4">
                        <label className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData("remember", e.target.checked)
                                }
                            />
                            <span className="text-sm text-gray-600 ms-2 dark:text-gray-400">
                                Ingat Saya
                            </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Forgot your password?
                            </Link>
                        )}

                        <PrimaryButton className="ms-4" disabled={processing}>
                            Masuk
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </GuestLayout>
    );
}
