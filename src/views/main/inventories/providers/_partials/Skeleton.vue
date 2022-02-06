<template>
    <tbody>
        <tr v-for="item in 8">
            <td class="text-center text-muted">
            </td>
            <td class="text">
                    <vue-skeleton-loader
                        type="rect"
                        :width="150"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td class="text">
                <vue-skeleton-loader
                    type="rect"
                    :width="70"
                    :height="15"
                    animation="fade"
                />
            </td>
            <td class="text-center">
                <center>
                    <vue-skeleton-loader
                        type="rect"
                        :width="70"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
        </tr>
    </tbody>
</template>