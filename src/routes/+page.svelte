<script>
    import { onMount } from "svelte";
    let file,
        folder = "css",
        status = "",
        repoReady = false;
    const folders = ["css", "fonts", "images", "js"];
    let fs, dir, git;

    onMount(async () => {
        const mod = await import("$lib/client-only/git.js");
        ({ fs, dir, git } = await mod.initRepo());
        repoReady = true;
    });

    async function handleUpload() {
        if (!repoReady || !file) return;
        const path = `${folder}/${file.name}`;
        const buffer = new Uint8Array(await file.arrayBuffer());

        await fs.promises.write(`${dir}/${path}`, buffer);
        await git.add({ fs, dir, filepath: path });
        await git.commit({
            fs,
            dir,
            message: `Add ${file.name} to ${folder}`,
            author: { name: "Your Name", email: "you@example.com" },
        });
        status = `✅ Uploaded ${file.name} to ${folder}`;
    }
</script>

<div class="min-h-screen bg-amber flex items-center justify-center p-6">
    <div
        class="w-full max-w-xl bg-cream border border-black p-10 font-mono text-primary"
    >
        <h1
            class="text-4xl font-black tracking-tighter uppercase border-b border-black pb-2 mb-8"
        >
            📤 Upload to CDN
        </h1>

        <div class="mt-0 mb-6">
            <label
                for="file-upload"
                class="block text-sm font-bold uppercase mb-2"
            >
                Choose a file
            </label>
            <input
                id="file-upload"
                type="file"
                on:change={(e) => (file = e.target.files[0])}
                class="w-full px-4 py-3 border border-black bg-white text-black text-sm font-semibold
                       focus:outline-none hover:bg-gray-100 transition"
            />
        </div>

        <div class="mt-0 mb-6">
            <label
                for="folder-select"
                class="block text-sm font-bold uppercase mb-2"
            >
                Select folder
            </label>
            <select
                id="folder-select"
                bind:value={folder}
                class="w-full px-4 py-3 border border-black bg-white text-black text-sm font-semibold
                       focus:outline-none hover:bg-gray-100 transition"
            >
                {#each folders as f}
                    <option value={f}>{f}</option>
                {/each}
            </select>
        </div>

        <button
            on:click={handleUpload}
            class="w-full py-4 bg-primary text-cream font-black text-lg border border-black uppercase hover:bg-terra transition mt-0 mb-6"
            disabled={!repoReady || !file}
        >
            Upload
        </button>

        {#if status}
            <p
                class="mt-0 mb-0 text-center text-terra font-bold text-md uppercase"
            >
                {status}
            </p>
        {/if}
    </div>
</div>
