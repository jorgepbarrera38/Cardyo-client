<template>
    <div class="container mt-4 mb-4 p-3 d-flex justify-content-center">
        <div class="card p-4">
            <div class=" image d-flex flex-column justify-content-center align-items-center"> 
                <button class="btn btn-secondary"> 
                    <img style="border-radius:50%"
                        :src="client.photo ? 'http://localhost:8000/' + client.photo : require('../../../../assets/user.png') "
                        height="100" width="100" />
                </button>
                <span class="name mt-3">{{ client.full_names }}</span>
                <span class="idd">{{ client.sex }}</span>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span class="idd1">
                        <i class="fa fa-id-card"></i> {{ client.identification }}
                    </span>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span class="idd1">
                        <i class="fa fa-birthday-cake"></i> {{ client.date_of_birth }}
                    </span>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span class="idd1">
                        <i class="fa fa-map-marker-alt"></i> {{ client.address }}
                    </span>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span class="idd1">
                        <i class="fa fa-envelope"></i> {{ client.email }}
                    </span>
                </div>
                <div class="d-flex flex-row justify-content-center align-items-center gap-2">
                    <span class="idd1">
                        <i class="fa fa-envelope"></i> {{ client.phonenumber }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        client: {
            type: Object,
            required: true
        }
    }
}
</script>
<style scoped>
.card {
    width: 350px;
    
    border: none;
    cursor: pointer;
    transition: all 0.5s
}

.image img {
    transition: all 0.5s
}

.card:hover .image img {
    transform: scale(1.5)
}

.btn {
    height: 140px;
    width: 140px;
    border-radius: 50%
}

.name {
    font-size: 22px;
    font-weight: bold
}

.idd {
    font-size: 14px;
    font-weight: 600
}

.idd1 {
    font-size: 12px
}

.number {
    font-size: 22px;
    font-weight: bold
}

.follow {
    font-size: 12px;
    font-weight: 500;
    color: #444444
}

.btn1 {
    height: 40px;
    width: 150px;
    border: none;
    background-color: #000;
    color: #aeaeae;
    font-size: 15px
}

.text span {
    font-size: 13px;
    color: #545454;
    font-weight: 500
}

.icons i {
    font-size: 19px
}

hr .new1 {
    border: 1px solid
}

.join {
    font-size: 14px;
    color: #a0a0a0;
    font-weight: bold
}

.date {
    background-color: #ccc
}
</style>