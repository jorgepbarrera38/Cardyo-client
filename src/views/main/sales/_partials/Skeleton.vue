<template>
    <tbody>
        <tr v-for="item in 8">
            <td>
            </td>
            <td>
                    <vue-skeleton-loader
                        type="rect"
                        :width="70"
                        :height="15"
                        animation="fade"
                    />
            </td>
            <td>
                <vue-skeleton-loader
                    type="rect"
                    :width="180"
                    :height="15"
                    animation="fade"
                />
            </td>
            <td class="text-center">
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
            <td class="text-center">
                <center style="margin-top:7.1px;margin-bottom:7.1px;">
                    <vue-skeleton-loader
                        type="rect"
                        :width="60"
                        :height="15"
                        animation="fade"
                    />
                </center>
            </td>
        </tr>
    </tbody>
</template>