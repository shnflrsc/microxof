<script lang="ts">
    import Icon from "@iconify/svelte";
    import microxofLogo from "$lib/assets/microxof.svg";
</script>

<header class="flex px-8 py-4 items-center justify-between">
    <a class="flex gap-x-1 items-center text-blue-500 hover:text-blue-600 duration-300 text-2xl font-bold" href="/">
        <img src={microxofLogo} alt="MicroXof Logo" class="h-10 w-auto" />
        <p>MicroXof</p>
    </a>

    <div class="flex gap-x-4">
        <a class="flex gap-x-1 text-blue-500 hover:text-blue-600 duration-300 items-center" href="/">
            <Icon icon="mdi:form" class="text-2xl" />
            <p>Registration Form</p>
        </a>
        <a class="flex gap-x-1 text-blue-500 hover:text-blue-600 duration-300 items-center" href="/registrations">
            <Icon icon="mdi:register" class="text-2xl" />
            <p>View Records</p>
        </a>
    </div>
</header>