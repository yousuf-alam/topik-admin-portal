<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              Default Header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              Default Body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              Default Footer
              <button class="modal-default-button" @click="closeModal">
                Close
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style>
/* Modal styling */
</style>
