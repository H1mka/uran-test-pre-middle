<template>
  <div class="inputs-form-wrapper">
    <div class="inputs-form-block">
      <label for="date">Date:</label>
      <input v-mask:date type="text" name="date" />
    </div>

    <div class="inputs-form-block">
      <label for="time">Time:</label>
      <input v-mask:time type="text" name="time" />
    </div>

    <div class="inputs-form-block">
      <label for="date_time">Date and time</label>
      <input v-mask:date_time type="text" name="date_time" />
    </div>

    <div class="inputs-form-block">
      <label for="cep">Cep</label>
      <input v-mask:cep type="text" name="cep" />
    </div>

    <div class="inputs-form-block">
      <label for="phone">Phone</label>
      <input v-mask:phone type="text" name="phone" />
    </div>

    <div class="inputs-form-block">
      <label for="phone_ddd">Phone with DDD</label>
      <input v-mask:phone_ddd type="text" name="phone_ddd" />
    </div>

    <div class="inputs-form-block">
      <label for="phone_us">Phone US</label>
      <input v-mask:phone_us type="text" name="phone_us" />
    </div>

    <div class="inputs-form-block">
      <label for="mixed">Mixed</label>
      <input v-mask:mixed type="text" name="mixed" />
    </div>

    <div class="inputs-form-block">
      <label for="ip_address">Id address</label>
      <input v-mask:ip_address type="text" name="ip_address" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.inputs-form-wrapper {
  .inputs-form-block {
    margin-bottom: 12px;

    label {
      display: block;
      font-size: 18px;
    }

    input {
      font-size: 16px;
      padding: 4px;
      outline: none;
    }
  }
}
</style>
