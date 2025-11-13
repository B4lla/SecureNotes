<template>
  <div class="min-h-screen bg-gray-950">
    <header class="bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div>
              <h1 class="text-xl font-bold text-white">
                SecureNotes
              </h1>
            </div>
          </div>
          
          <button
            @click="logout"
            class="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition-all duration-200 border border-gray-700"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center space-x-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>New note</span>
        </button>
      </div>

      <div v-if="loading" class="text-center py-12">
        <svg class="animate-spin h-12 w-12 mx-auto text-cyan-500" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
        <p class="text-gray-500 mt-4">Decrypting notes...</p>
      </div>

      <div v-else-if="notes.length === 0" class="text-center py-16">
        <div class="inline-flex items-center justify-center w-20 h-20 bg-gray-900/70 rounded-2xl mb-4 border border-gray-800">
          <svg class="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-300 mb-2">No notes</h3>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="note in notes"
          :key="note.id"
          class="bg-gray-900/70 backdrop-blur-xl border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all duration-200 group"
        >
          <div class="flex items-start justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-100 flex-1 line-clamp-2">
              {{ note.title || 'No title' }}
            </h3>
            <div class="flex items-center space-x-2 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click="editNote(note)"
                class="p-2 bg-gray-800 hover:bg-indigo-600 text-gray-400 hover:text-white rounded-lg transition-all duration-200"
                title="Editar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                @click="confirmDelete(note)"
                class="p-2 bg-gray-800 hover:bg-red-600 text-gray-400 hover:text-white rounded-lg transition-all duration-200"
                title="Eliminar"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>

          <p class="text-gray-400 text-sm mb-4 line-clamp-6 whitespace-pre-wrap">
            {{ note.content }}
          </p>

          <div class="flex items-center justify-between text-xs text-gray-600 pt-4 border-t border-gray-800">
            <span>{{ formatDate(note.created_at) }}</span>
            <span v-if="note.updated_at !== note.created_at" title="Last update">
              Editado
            </span>
          </div>
        </div>
      </div>
    </main>

    <div
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      @click.self="closeModals"
    >
      <div class="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div class="flex items-center justify-between p-6 border-b border-gray-800">
          <h2 class="text-2xl font-semibold text-white">
            {{ showEditModal ? 'Edit note' : 'New note' }}
          </h2>
          <button
            @click="closeModals"
            class="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form @submit.prevent="showEditModal ? updateNote() : createNote()" class="p-6 space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              v-model="noteForm.title"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-950/70 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-600 outline-none transition-all duration-200 text-gray-100 placeholder-gray-600"
              placeholder="Note title"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-400 mb-2">
              Content
            </label>
            <textarea
              v-model="noteForm.content"
              required
              rows="12"
              class="w-full px-4 py-3 bg-gray-950/70 border border-gray-800 rounded-xl focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-600 outline-none transition-all duration-200 text-gray-100 placeholder-gray-600 resize-none"
              placeholder="Enter your note here"
            ></textarea>
          </div>

          <div v-if="error" class="bg-red-500/10 border border-red-800 rounded-xl p-3 text-red-400 text-sm">
            {{ error }}
          </div>

          <div class="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeModals"
              class="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="saving"
              class="px-6 py-3 bg-cyan-700 hover:bg-cyan-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-900/30 hover:shadow-cyan-900/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!saving">{{ showEditModal ? 'Update' : 'Create note' }}</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      @click.self="showDeleteModal = false"
    >
      <div class="bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl max-w-md w-full shadow-2xl">
        <div class="p-6">
          <div class="flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mx-auto mb-4 border border-red-900/30">
            <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 class="text-xl font-semibold text-center mb-2 text-white">Remove note?</h3>

          <div class="flex items-center space-x-3">
            <button
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              @click="deleteNote"
              :disabled="deleting"
              class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="!deleting">Remove</span>
              <span v-else>Removing...</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getNotes, createNote, updateNote, deleteNote } from '../utils/api.js';
import { encryptNote, decryptNote } from '../utils/crypto.js';

export default {
  data() {
    return {
      notes: [],
      loading: true,
      error: '',
      masterPassword: '',
      showCreateModal: false,
      showEditModal: false,
      showDeleteModal: false,
      noteForm: {
        title: '',
        content: ''
      },
      currentNote: null,
      saving: false,
      deleting: false,
      noteToDelete: null
    };
  },
  mounted() {
    this.loadNotes();
  },
  methods: {
    async loadNotes() {
      const token = localStorage.getItem('token');
      const password = localStorage.getItem('masterPassword');
      
      if (!token || !password) {
        this.$router.push('/login');
        return;
      }

      this.masterPassword = password;
      this.loading = true;

      try {
        const encryptedNotes = await getNotes(token);
        this.notes = encryptedNotes.map(note => {
          try {
            const decrypted = decryptNote(note.note, this.masterPassword);
            const parsed = JSON.parse(decrypted);
            return {
              id: note.id,
              title: parsed.title,
              content: parsed.content,
              created_at: note.created_at,
              updated_at: note.updated_at
            };
          } catch (err) {
            console.error('Error:', err);
            return null;
          }
        }).filter(note => note !== null);
      } catch (err) {
        this.error = 'Error while loading notes';
        console.error(err);
      } finally {
        this.loading = false;
      }
    },
    
    async createNote() {
      this.error = '';
      this.saving = true;

      try {
        const token = localStorage.getItem('token');
        const noteData = JSON.stringify({
          title: this.noteForm.title,
          content: this.noteForm.content
        });
        
        const encrypted = encryptNote(noteData, this.masterPassword);
        await createNote(token, encrypted);
        
        this.closeModals();
        await this.loadNotes();
      } catch (err) {
        this.error = 'Error while creating the note';
        console.error(err);
      } finally {
        this.saving = false;
      }
    },

    editNote(note) {
      this.currentNote = note;
      this.noteForm.title = note.title;
      this.noteForm.content = note.content;
      this.showEditModal = true;
    },

    async updateNote() {
      this.error = '';
      this.saving = true;

      try {
        const token = localStorage.getItem('token');
        const noteData = JSON.stringify({
          title: this.noteForm.title,
          content: this.noteForm.content
        });
        
        const encrypted = encryptNote(noteData, this.masterPassword);
        await updateNote(token, this.currentNote.id, encrypted);
        
        this.closeModals();
        await this.loadNotes();
      } catch (err) {
        this.error = 'Error while updating the note';
        console.error(err);
      } finally {
        this.saving = false;
      }
    },

    confirmDelete(note) {
      this.noteToDelete = note;
      this.showDeleteModal = true;
    },

    async deleteNote() {
      this.deleting = true;

      try {
        const token = localStorage.getItem('token');
        await deleteNote(token, this.noteToDelete.id);
        
        this.showDeleteModal = false;
        this.noteToDelete = null;
        await this.loadNotes();
      } catch (err) {
        this.error = 'Error while removing the note';
        console.error(err);
      } finally {
        this.deleting = false;
      }
    },

    closeModals() {
      this.showCreateModal = false;
      this.showEditModal = false;
      this.noteForm = { title: '', content: '' };
      this.currentNote = null;
      this.error = '';
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const diff = now - date;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (days === 0) return 'Today';
      if (days === 1) return 'Yesterday';
      if (days < 7) return `${days} ago`;
      
      return date.toLocaleDateString('en-EN', { 
        day: 'numeric', 
        month: 'short',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
      });
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('masterPassword');
      this.$router.push('/login');
    }
  }
};
</script>
