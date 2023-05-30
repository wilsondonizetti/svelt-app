<script lang="ts">
    import { invalidateAll } from "$app/navigation";
    import type { IUser } from "$lib/models/IUser";
    import { AuthService } from "$lib/services/AuthService";

    let user: IUser = {
        username: { value: "" },
        password: { value: "" },
    };
    const handleSubmit = async (event: any) => {
        console.log("Login:", user);

        const response = await AuthService.auth(user);
        const result = await response.text();
        console.log("result:", result);
        if (response.ok) {
            await invalidateAll();
        }
    };

    const isNullOrEmpty = (value: string) => {
        return value != null && value != undefined && value != "";
    };

    const validate = async (dados: IUser): Promise<boolean> => {
        console.log('validate', dados);
        dados.password.isValid = isNullOrEmpty(dados.password.value);
        dados.password.error = dados.password.isValid
            ? undefined
            : "Password is required";

        dados.username.isValid = isNullOrEmpty(dados.username.value);
        dados.username.error = dados.username.isValid
            ? undefined
            : "Username is required";

        return dados.password.isValid && dados.username.isValid;
    };
    const validateField = async (event:KeyboardEvent) => {

        console.log('validate Field', event);        
        console.log('validate Field p:');        
    };
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login page" />
</svelte:head>
<div class="text-column">
    <h1>Login</h1>

    <p>Hello on this page you can entry in our applicationa</p>
    <form id="formLogin">
        <!-- {#if form?.missing}<p class="error">The user field is required</p>{/if} -->
        <!-- {#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if} -->
        
        {#if !user.username.isValid}<p class="error">
                The user field is required {user.username.value}
            </p>{/if}
        <label>
            User
            <input
                id="txtUser"
                name="txtUser"
                type="text"
                bind:value={user.username.value}
                on:keypress={validateField}
                data-validation="username"                
            />
        </label>
        <label>
            Password
            <input
                name="password"
                type="password"
                bind:value={user.password.value}
                on:change={async () => {
                    await validate(user);
                }}
            />
        </label>
        <button on:click={handleSubmit}>Log in</button>
    </form>
</div>

<style>
    .error {
        color: red;
    }
</style>