<script lang="ts">
    import { enhance } from "$app/forms";
    let { form } = $props();
</script>

<svelte:head>
    <title>MicroXof</title>
</svelte:head>

<main class="p-8">

    <form class="w-11/12 place-self-center" method="post" action="?/submit" use:enhance>

        <ul class="grid grid-cols-1 md:grid-cols-6 auto-rows-auto gap-x-2 gap-y-2 *:flex *:flex-col *:gap-y-2">

            <li class="md:col-span-2">
                <label for="first_name">First Name <span class="text-red-500">*</span></label>
                <input type="text" id="first_name" name="first_name" placeholder="Xoft" required>
            </li>
            <li class="md:col-span-2">
                <label for="middle_name">Middle Name</label>
                <input type="text" id="middle_name" name="middle_name">
            </li>
            <li class="md:col-span-2">
                <label for="last_name">Last Name <span class="text-red-500">*</span></label>
                <input type="text" id="last_name" name="last_name" placeholder="Dela Cruz" required>
            </li>

            <li class="md:col-span-2">
                <label for="email">Email <span class="text-red-500">*</span></label>
                <input type="text" id="email" name="email" placeholder="xoftdelacruz@outlook.com" required>
            </li>
            <li class="md:col-span-2">
                <label for="birthdate">Birthdate <span class="text-red-500">*</span></label>
                <input type="date" id="birthdate" name="birthdate" required>
            </li>
            <li class="md:col-span-2">
                <label for="gender">Gender <span class="text-red-500">*</span></label>
                <select id="gender" name="gender" required>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="other">Prefer not to say/Other</option>
                </select>
            </li>
            
            <li class="md:col-span-2">
                <label for="student_number">Student Number <span class="text-red-500">*</span></label>
                <input type="text" id="student_number" name="student_number" placeholder="2026000001" required>
            </li>
            <li class="md:col-span-2">
                <label for="year_level">Year Level <span class="text-red-500">*</span></label>
                <select id="year_level" name="year_level" required>
                    <option value="freshman">Freshman</option>
                    <option value="sophomore">Sophomore</option>
                    <option value="junior">Junior</option>
                    <option value="senior">Senior</option>
                </select>
            </li>
            <li class="md:col-span-2">
                <label for="college">College <span class="text-red-500">*</span></label>
                <select name="college" id="college" required>
                    <option value="CAFA">CAFA</option>
                    <option value="CAL">CAL</option>
                    <option value="CBEA">CBEA</option>
                    <option value="CCJE">CCJE</option>
                    <option value="CHTM">CHTM</option>
                    <option value="CICT" selected>CICT</option>
                    <option value="CIT">CIT</option>
                    <option value="CLaw">CLaw</option>
                    <option value="CN">CN</option>
                    <option value="COE">COE</option>
                    <option value="CPTEd">CPTEd</option>
                    <option value="CS">CS</option>
                    <option value="CSER">CSER</option>
                    <option value="CSSP">CSSP</option>
                    <option value="GS">GS</option>
                </select>
            </li>
            
            <li class="md:col-span-6">
                <label for="program">Program <span class="text-red-500">*</span></label>
                <input type="text" id="program" name="program" placeholder="BS Information Technology" required>
            </li>

            <li class="md:col-span-3">
                <label for="contact_number">Contact Number <span class="text-red-500">*</span></label>
                <input type="text" id="contact_number" name="contact_number" placeholder="09000000000" required>
            </li>
            <li class="md:col-span-3">
                <label for="address">Address <span class="text-red-500">*</span></label>
                <input type="text" id="address" name="address" placeholder="Block 20 Lot 21, MSC Street, Brgy. Xoft, Malolos City, Bulacan" required>
            </li>

        </ul>

        <input class="py-3 px-2 bg-blue-600 text-white font-bold w-full mt-8 hover:bg-blue-700 duration-200 cursor-pointer" type="submit" value="Register">

        {#if form?.success}
            <p class="text-green-600 font-bold mt-4">{form.message}</p>
        {/if}
        {#if form?.success === false}
            <p class="text-red-600 font-bold mt-4">{form.message}</p>
        {/if}

    </form>

</main>