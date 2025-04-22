<script>
    import "../app.css";
    import {Buffer} from "buffer";
    if (!window.Buffer){
        window.Buffer = Buffer;
    }
</script>

<slot />
