import unittest
import numpy as np
from op_test import OpTest


def conv3d_forward_naive(input, filter, group, conv_param):
    in_n, in_c, in_d, in_h, in_w = input.shape
    out_c, f_c, f_d, f_h, f_w = filter.shape
    assert f_c * group == in_c
    assert np.mod(out_c, group) == 0
    sub_out_c = out_c / group

    stride, pad = conv_param['stride'], conv_param['pad']
    out_d = 1 + (in_d + 2 * pad[0] - f_h) / stride[0]
    out_h = 1 + (in_h + 2 * pad[1] - f_h) / stride[1]
    out_w = 1 + (in_w + 2 * pad[2] - f_w) / stride[2]
    out = np.zeros((in_n, out_c, out_d, out_h, out_w))

    input_pad = np.pad(input, ((0, ), (0, ), (pad[0], ), (pad[1], ),
                               (pad[2], )),
                       mode='constant',
                       constant_values=0)
    for d in range(out_d):
        for i in range(out_h):
            for j in range(out_w):
                for g in range(group):
                    input_pad_masked = \
                        input_pad[:, g * f_c:(g + 1) * f_c,
                        d * stride[0]:d * stride[0] + f_d,
                        i * stride[1]:i * stride[1] + f_h,
                        j * stride[2]:j * stride[2] + f_w]
                    f_sub = filter[g * sub_out_c:(g + 1) *
                                   sub_out_c, :, :, :, :]
                    for k in range(sub_out_c):
                        out[:, g * sub_out_c + k, d, i, j] = \
                            np.sum(input_pad_masked * f_sub[k, :, :, :, :],
                                   axis=(1, 2, 3, 4))

    return out


class TestConv3dOp(OpTest):
    def setUp(self):
        self.init_group()
        self.init_op_type()
        self.init_test_case()

        conv3d_param = {'stride': self.stride, 'pad': self.pad}
        input = np.random.random(self.input_size).astype("float32")
        filter = np.random.random(self.filter_size).astype("float32")
        output = conv3d_forward_naive(input, filter, self.groups, conv3d_param)

        self.inputs = {'Input': input, 'Filter': filter}
        self.attrs = {
            'strides': self.stride,
            'paddings': self.pad,
            'groups': self.groups
        }
        self.outputs = {'Output': output}

    def test_check_output(self):
        self.check_output()

    def test_check_grad(self):
        self.check_grad(
            set(['Input', 'Filter']), 'Output', max_relative_error=0.05)

        self.check_grad(
            ['Input'],
            'Output',
            max_relative_error=0.05,
            no_grad_set=set(['Filter']))

    def test_check_grad_no_input(self):
        self.check_grad(
            ['Filter'],
            'Output',
            max_relative_error=0.05,
            no_grad_set=set(['Input']))

    def init_test_case(self):
        self.pad = [0, 0, 0]
        self.stride = [1, 1, 1]
        self.input_size = [2, 3, 5, 5, 5]  # NCDHW
        assert np.mod(self.input_size[1], self.groups) == 0
        f_c = self.input_size[1] / self.groups
        self.filter_size = [6, f_c, 3, 3, 3]

    def init_group(self):
        self.groups = 1

    def init_op_type(self):
        self.op_type = "conv3d"


class TestCase1(TestConv3dOp):
    def init_test_case(self):
        self.pad = [1, 1, 1]
        self.stride = [1, 1, 1]
        self.input_size = [2, 3, 5, 5, 5]  # NCDHW
        assert np.mod(self.input_size[1], self.groups) == 0
        f_c = self.input_size[1] / self.groups
        self.filter_size = [6, f_c, 3, 3, 3]

    def init_group(self):
        self.groups = 1

    def init_op_type(self):
        self.op_type = "conv3d"


class TestWithGroup1(TestConv3dOp):
    def init_group(self):
        self.groups = 3

    def init_op_type(self):
        self.op_type = "conv3d"


class TestWithGroup2(TestCase1):
    def init_group(self):
        self.groups = 3

    def init_op_type(self):
        self.op_type = "conv3d"


if __name__ == '__main__':
    unittest.main()
