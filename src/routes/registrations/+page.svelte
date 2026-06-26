<script lang="ts">
    export const { data } = $props();
    import Icon from "@iconify/svelte";
    import type { Registration } from "$lib/server/db/schema";

    let registrations = $state<Registration[]>([]);
    let hasRegistrations = $derived(registrations.length > 0);

    $effect(() => {
        registrations = [...data.registrations];
    });

    async function downloadCsv() {

        console.log(hasRegistrations);

        try {
            const response = await fetch("/api/download-csv");
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Failed to download CSV");
            }
    
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "microxof_registrations_export.csv";
            document.body.appendChild(a);
            a.click();
    
            window.URL.revokeObjectURL(url);
            a.remove();
        } catch (error) {
            console.error("Error downloading CSV:", error);
        }
    }

    async function deleteRegistration(id: number) {
        try {
            const response = await fetch(`/api/registrations/${id}`, {
                method: "DELETE",
            });
    
            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || "Failed to delete registration");
            }
    
            registrations = registrations.filter(
                (registration: Registration) => registration.id !== id
            );
        } catch (error) {
            console.error("Error deleting registration:", error);
        }
    }
</script>

<main>

    <button class="cursor-pointer flex gap-x-1 duration-300 items-center mt-4 mr-8 place-self-end" class:text-blue-500={hasRegistrations} class:hover:text-blue-600={hasRegistrations} class:text-neutral-500={!hasRegistrations} onclick={downloadCsv} disabled={!hasRegistrations}>
            <Icon icon="mdi:download" class="text-2xl" />
            <p>Download CSV</p>
        </button>

    <table class="text-xs text-left mt-8">
        <thead>
            <tr class="*:p-2">
                <th></th>
                {#each data.columns as column}
                    <th>{column}</th>
                {/each}
            </tr>
        </thead>
        <tbody>
            {#each registrations as registration}
                <tr class="*:p-2">
                    <td>
                        <button class="text-red-500 hover:text-red-600 duration-300 cursor-pointer" onclick={() => deleteRegistration(registration.id)}   >
                            delete
                        </button>
                    </td>
                    <td>{registration.id}</td>
                    <td>{registration.firstName}</td>
                    <td>{registration.middleName}</td>
                    <td>{registration.lastName}</td>
                    <td>{registration.suffix}</td>
                    <td>{registration.email}</td>
                    <td>{registration.birthdate}</td>
                    <td>{registration.gender}</td>
                    <td>{registration.studentNumber}</td>
                    <td>{registration.yearLevel}</td>
                    <td>{registration.college}</td>
                    <td>{registration.program}</td>
                    <td>{registration.contactNumber}</td>
                    <td>{registration.address}</td>
                    <td>{registration.createdAt}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>