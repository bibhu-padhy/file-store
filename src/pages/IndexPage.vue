<template>
  <q-page>
    <div class="flex flex-center flex-column">
      <div v-if="savedFiles">
        <div v-for="file of savedFiles">
          <q-card class="my-card">
            <q-img
              :src="file.downloadURL"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
            />
            <span class="q-mx-sm">{{ file.name }}</span>
            <q-icon
              class="q-pa-md"
              name="download"
              color="primary"
              size="20px"
              @click="onDownload(file)"
            />
          </q-card>
        </div>
      </div>
      <div v-else>No files found</div>
    </div>
    <div class="flex flex-center flex-column q-mt-md">
      <q-file outlined v-model="files" for="files" use-chips multiple append>
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
        <template v-slot:after>
          <q-btn round dense flat icon="send" @click="onUpload" />
        </template>
      </q-file>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { storage, firestore } from "../boot/firebase";
export default defineComponent({
  name: "IndexPage",
  data() {
    return {
      name: String,
      files: null,
      savedFiles: null,
    };
  },
  methods: {
    async onDownload(media) {
      const file = await fetch(media.downloadURL);
      const fileBlob = await file.blob();
      const fileURL = URL.createObjectURL(fileBlob);

      const link = document.createElement("a");
      link.href = fileURL;
      link.download = media.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    onUpload() {
      for (const file of this.files) {
        const filePath = `${Date.now()}_${file.name}`;
        console.log(filePath);
        let storageRef = storage.ref(filePath);
        const uploadTask = storageRef.put(file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL);
              firestore.collection("files").add({
                name: file.name,
                size: file.size,
                type: file.name,
                path: filePath,
                downloadURL,
              });
            });
          }
        );
      }
      this.files = null;
    },
  },
  mounted() {
    firestore
      .collection("files")
      .get()
      .then((res) => {
        if (res.empty) {
          return;
        }
        const files = [];
        res.docs.forEach((doc) => {
          files.push(doc.data());
        });
        this.savedFiles = files;
      });
  },
});
</script>
