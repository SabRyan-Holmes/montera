import { useEffect, useRef } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    ApplicationLogo,
    TextInput,
    PrimaryButton,
    InputLabel,
    Checkbox,
    InputError,
    SecondaryButton,
} from "@/Components";
import GuestLayout from "@/Layouts/GuestLayout";
import ReCAPTCHA from "react-google-recaptcha";

export default function SSOLogin({ status, canAddPegawai }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        username: "",
        password: "",
        captcha: "", // tambahkan ini
        nip: "",
        remember: false,
    });

    useEffect(() => {
        console.log("recaptchaRef.current", recaptchaRef.current);

        console.log(import.meta.env.VITE_RECAPTCHA_SITE_KEY);
        return () => {
            reset("password");
        };
    }, []);

    const recaptchaRef = useRef();

    const submit = async (e) => {
        e.preventDefault();

        if (
            !recaptchaRef.current ||
            !recaptchaRef.current.executeAsync ||
            !recaptchaRef.current.props.grecaptcha.execute
        ) {
            alert("reCAPTCHA belum siap.");
            return;
        }

        try {
            const token = await recaptchaRef.current.executeAsync();
            console.log("Token dari Recaptcha:", token);

            setData("captcha", token); // <- Ini penting

            post(route("sso-login" ), {
                data:data,
                forceFormData:true,
                onFinish: () => recaptchaRef.current.reset(), // reset setelah kirim
            });

            // recaptchaRef.current.reset();
        } catch (error) {
            console.error("Gagal mendapatkan token:", error);
            alert("Gagal mendapatkan token reCAPTCHA.");
        }
    };

    useEffect(() => {
        const savedNip = localStorage.getItem("nip");
        if (savedNip) {
            setData("nip", savedNip);
        }
    }, []);
    // Saat NIP berubah, simpan ke localStorage
    useEffect(() => {
        if (data.nip) {
            localStorage.setItem("nip", data.nip);
        }
    }, [data.nip]);
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
                    Sistem Penetapan & Pencetakan Angka Kredit
                </strong>
            </div>

            <p className="mt-5 text-sm font-semibold text-center text-slate-600/90">
                Silahkan masuk menggunakan akun SSO anda
            </p>

            <section className="mx-2 mt-6 ">
                <form onSubmit={submit}>
                    <fieldset>
                        <InputLabel htmlFor="username" value="Username" />

                        <TextInput
                            id="username"
                            type="text"
                            name="username"
                            value={data.username}
                            className="block w-full mt-1 h-11"
                            autoComplete={data.username}
                            placeholder="Masukkan Username"
                            isFocused={true}
                            onChange={(e) =>
                                setData("username", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.username}
                            className="mt-2"
                        />
                        <InputError message={errors.captcha} className="mt-2" />
                    </fieldset>

                    <fieldset className="mt-3">
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
                    </fieldset>

                    <fieldset className="mt-3">
                        <InputLabel htmlFor="nip" value="NIP" />

                        <TextInput
                            id="nip"
                            type="text"
                            name="nip"
                            value={data.nip}
                            className="block w-full mt-1 h-11"
                            autoComplete={data.nip}
                            placeholder="Masukkan NIP Anda"
                            isFocused={true}
                            onChange={(e) => setData("nip", e.target.value)}
                        />

                        <InputError message={errors.nip} className="mt-2" />
                    </fieldset>

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

                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        size="invisible"
                    />
                    <div className="flex items-center justify-end mt-4">
                        {canAddPegawai && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-gray-600 underline rounded-md dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                NIP pada Sistem Tidak Ditemukan?
                            </Link>
                        )}
                        <PrimaryButton
                            type="submit"
                            className="ms-4"
                            disabled={processing}
                        >
                            Masuk
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </GuestLayout>
    );
}
